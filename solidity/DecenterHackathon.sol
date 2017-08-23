pragma solidity ^0.4.15;

contract DecenterHackathon {

    struct Team {
        string name;
        string memberNames;
        uint score;
        bool rewardEligible;
    }

    struct Sponsor {
        string name;
        string siteUrl;
        string logoUrl;
        uint contribution;
    }

    enum Period { Registration, Competition, Voting, Final }

    uint public totalContribution;
    Period public currentPeriod;

    mapping(address => Team) public teams;
    mapping(address => string) juryMemberNames;

    address administrator;
    address[] public teamAddresses;
    address[] public juryMembers;
    Sponsor[] public sponsors;

    event PeriodChanged(Period newPeriod);
    event TeamRegistered(string teamName, address teamAddress, string memberNames, bool rewardEligible);
    event JuryMemberAdded(string juryMemberName, address juryMemberAddress);
    event SponsorshipReceived(string sponsorName, string sponsorSite, string sponsorLogoUrl, uint amount);
    event VoteReceived(string juryMemberName, address teamAddress, uint points);
    event PrizePaid(string teamName, uint amount);

    modifier onlyOwner {
        require(msg.sender == administrator);
        _;
    }

    modifier onlyJury {
        require(bytes(juryMemberNames[msg.sender]).length > 0);
        _;
    }

   function DecenterHackathon() {
        administrator = msg.sender;
        currentPeriod = Period.Registration;
    }

    // Administrator is able to switch between periods at any time
    function switchToNextPeriod() onlyOwner {
        if(currentPeriod == Period.Final) {
            return;
        }

        currentPeriod = Period(uint(currentPeriod) + 1);

        PeriodChanged(currentPeriod);
    }

    // Administrator can add new teams during registration period, with an option to make a team non-eligible for the prize
    function registerTeam(string _name, address _teamAddress, string _memberNames, bool _rewardEligible) onlyOwner {
        require(currentPeriod == Period.Registration);
        require(bytes(teams[_teamAddress].name).length == 0);

        teams[_teamAddress] = Team({
            name: _name,
            memberNames: _memberNames,
            score: 0,
            rewardEligible: _rewardEligible
        });

        teamAddresses.push(_teamAddress);
        TeamRegistered(_name, _teamAddress, _memberNames, _rewardEligible);
    }

    // Administrator can add new jury members during registration period
    function registerJuryMember(string _name, address _ethAddress) onlyOwner {
        require(currentPeriod == Period.Registration);

        juryMembers.push(_ethAddress);
        juryMemberNames[_ethAddress] = _name;

        JuryMemberAdded(_name, _ethAddress);
    }

    // Anyone can contribute to the prize pool (i.e. either sponsor himself or administrator on behalf of the sponsor) during registration period
    function contributeToPrizePool(string _name, string _siteUrl, string _logoUrl) payable {
        require(currentPeriod == Period.Registration);
        require(msg.value > 0);

        sponsors.push(Sponsor({
            name: _name,
            siteUrl: _siteUrl,
            logoUrl: _logoUrl,
            contribution: msg.value
        }));

        totalContribution += msg.value;
        SponsorshipReceived(_name, _siteUrl, _logoUrl, msg.value);
    }

    // Jury members can vote during voting period.
    // The _votes parameter should be an array of team addresses, sorted by score from highest to lowest based on jury member's preferences
    function vote(address[] _votes) onlyJury {
        require(currentPeriod == Period.Voting);

        uint _points = _votes.length;

        for(uint i = 0; i < _votes.length; i++) {
            // All submitted teams must be registered
            require(bytes(teams[_votes[i]].name).length > 0);

            teams[_votes[i]].score += _points;

            VoteReceived(juryMemberNames[msg.sender], _votes[i], _points);
            _points--;
        }

        // This will prevent jury members from voting more than once
        juryMemberNames[msg.sender] = "";
    }

    // Administrator can initiate prize payout during final period.
    // The _sortedTeams parameter should be an array of correctly sorted teams by score, from highest to lowest
    function payoutPrizes(address[] _sortedTeams) onlyOwner {
        require(currentPeriod == Period.Final);
        require(_sortedTeams.length == teamAddresses.length);

        for(uint i = 0; i < _sortedTeams.length; i++) {
            // All submitted teams must be registered
            require(bytes(teams[_sortedTeams[i]].name).length > 0);

            // Teams must be sorted correctly
            require(i == _sortedTeams.length - 1 || teams[_sortedTeams[i + 1]].score <= teams[_sortedTeams[i]].score);
        }

        // Prizes are paid based on logarithmic scale, where first teams receives 1/2 of the prize pool, second 1/4 and so on
        uint prizePoolDivider = 2;

        for(i = 0; i < _sortedTeams.length; i++) {
            uint _prizeAmount = totalContribution / prizePoolDivider;

            if(teams[_sortedTeams[i]].rewardEligible) {
                _sortedTeams[i].transfer(_prizeAmount);
                prizePoolDivider *= 2;
                PrizePaid(teams[_sortedTeams[i]].name, _prizeAmount);
            }
        }
    }

    // Administrator can always retrieve all ETH from the contract (e.g. in case something goes wrong)
    function sendRemainingEtherToOwner() onlyOwner {
        administrator.transfer(this.balance);
    }

    // Public function that returns user type for the given address
    function getUserType(address _address) constant returns (string) {
        if(_address == administrator) {
            return "administrator";
        } else if(bytes(juryMemberNames[_address]).length > 0) {
            return "jury";
        } else {
            return "other";
        }
    }

    function restartPeriod() onlyOwner {
        currentPeriod = Period.Registration;
    }
}