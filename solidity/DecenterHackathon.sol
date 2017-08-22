pragma solidity ^0.4.15;

contract DecenterHackathon {

    enum Period { Registration, Competition, Voting, Final }

    Period public currentPeriod;

    struct Team {
        string name;
        uint score;
        bool rewardEligible;
    }

    struct Sponsor {
        string name;
        string siteUrl;
        string logoUrl;
        uint contribution;
    }

    mapping(address => Team) public teams;
    mapping(address => string) juryMemberNames;

    address administrator;
    Sponsor[] public sponsors;
    address[] public juryMembers;
    address[] public teamAddresses;
    uint public totalContribution;

    event PeriodChanged(Period newPeriod);
    event TeamRegistered(string teamName, address teamAddress);
    event JuryMemberAdded(string juryMemberName, address juryMemberAddress);
    event SponsorshipReceived(string sponsorName, uint amount);
    event VotesReceived(string juryMemberName, address[] votes);
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

    function switchToNextPeriod() onlyOwner {
        if(currentPeriod == Period.Final) {
            return;
        }

        currentPeriod = Period(uint(currentPeriod) + 1);

        PeriodChanged(currentPeriod);
    }

    function registerTeam(string _name, address _teamAddress, bool rewardEligible) onlyOwner {
        require(currentPeriod == Period.Registration);
        require(bytes(teams[_teamAddress].name).length == 0);

        teams[_teamAddress] = Team({
            name: _name,
            score: 0,
            rewardEligible: rewardEligible
        });

        teamAddresses.push(_teamAddress);
        TeamRegistered(_name, _teamAddress);
    }

    function registerJuryMember(string _name, address _ethAddress) onlyOwner {
        require(currentPeriod == Period.Registration);

        juryMembers.push(_ethAddress);
        juryMemberNames[_ethAddress] = _name;

        JuryMemberAdded(_name, _ethAddress);
    }

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
        SponsorshipReceived(_name, msg.value);
    }

    function vote(address[] _votes) onlyJury {
        require(currentPeriod == Period.Voting);

        uint _points = _votes.length;

        for(uint i = 0; i < _votes.length; i++) {
            teams[_votes[i]].score += _points;
            _points--;
        }

        juryMemberNames[msg.sender] = "";
        VotesReceived(juryMemberNames[msg.sender], _votes);
    }

    function payoutPrizes(address[] _sortedTeams) onlyOwner {
        require(currentPeriod == Period.Final);
        require(_sortedTeams.length == teamAddresses.length);

        for(uint i = 0; i < _sortedTeams.length; i++) {
            // All submitted teams must be registered
            require(bytes(teams[_sortedTeams[i]].name).length > 0);

            // Teams must be sorted correctly
            require(i == _sortedTeams.length - 1 || teams[_sortedTeams[i + 1]].score <= teams[_sortedTeams[i]].score);
        }

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

    function sendRemainingEtherToOwner() onlyOwner {
        administrator.transfer(this.balance);
    }

    function getTeamAddresses() constant returns (address[]) {
        return teamAddresses;
    }

    function restartPeriod() onlyOwner {
        currentPeriod = Period.Registration;
    }
}