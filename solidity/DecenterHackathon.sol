pragma solidity ^0.4.0;

contract DecenterHackathon {

    enum Period { Registration, Competition, Voting, Final }

    Period public currentPeriod;

    struct Team {
        string name;
        uint score;
        bool rewardEligable;
    }

    struct Sponsor {
        string name;
        string siteUrl;
        string logoUrl;
        uint contribution;
    }

    mapping(address => Sponsor) public sponsors;
    mapping(address => Team) public teams;
    mapping(address => uint) juryMemberIds;

    address administrator;
    address[] juryMembers;
    address[] public allSponsors;
    address[] public allTeams;
    uint public totalContribution;

    event PeriodChanged(Period newPeriod);
    event TeamRegistered(string teamName, address teamAddress);
    event SponsorshipReceived(string sponsorName, uint amount);
    event VoteReceived(uint juryMemberId, address[] votes);
    event PrizePaid(string teamName, uint amount);

    modifier onlyOwner {
        require(msg.sender == administrator);
        _;
    }

    modifier onlyJury {
        require(juryMemberIds[msg.sender] > 0);
        _;
    }

   function DecenterHackathon() {
        administrator = msg.sender;
        currentPeriod = Period.Registration;
    }

    function goToNextPeriod() onlyOwner {
        if (currentPeriod == Period.Final)
            return;

        currentPeriod = Period(uint(currentPeriod) + 1);

        PeriodChanged(currentPeriod);
    }

    function registerTeam(string _name, address _teamAddress, bool rewardEligable) onlyOwner {
        require(currentPeriod == Period.Registration);
        require(bytes(teams[_teamAddress].name).length == 0);

        teams[_teamAddress] = Team({
            name: _name,
            score: 0,
            rewardEligable: rewardEligable
        });

        allTeams.push(_teamAddress);

        TeamRegistered(_name, _teamAddress);
    }

    function registerJuryMember(address _juryMemberAddress) onlyOwner {
        require(currentPeriod == Period.Registration);
        require(juryMemberIds[_juryMemberAddress] == 0);

        juryMembers.push(_juryMemberAddress);
        juryMemberIds[_juryMemberAddress] = juryMembers.length;
    }

    function contributeToPrizePool(string _name, string _siteUrl, string _logoUrl) payable {
        require(currentPeriod == Period.Registration);
        require(msg.value > 0);

        // A single sponsor should be initialized only once
        if (sponsors[msg.sender].contribution == 0) {
                sponsors[msg.sender] = Sponsor({
                name: _name,
                siteUrl: _siteUrl,
                logoUrl: _logoUrl,
                contribution: 0
            });

            allSponsors.push(msg.sender);
        }

        sponsors[msg.sender].contribution += msg.value;
        totalContribution += msg.value;

        SponsorshipReceived(_name, msg.value);
    }

    function vote(address[] _votes) onlyJury {
        require(currentPeriod == Period.Voting);

        uint _points = _votes.length;

        for (uint i = 0; i < _votes.length; i++) {
            teams[_votes[i]].score += _points;
            _points--;
        }

        juryMemberIds[msg.sender] = 0;

        VoteReceived(juryMemberIds[msg.sender], _votes);
    }

    function payoutPrizes(address[] _sortedTeams) onlyOwner {
        require(currentPeriod == Period.Final);
        require(_sortedTeams.length == allTeams.length);

        for (uint i = 0; i < _sortedTeams.length - 1; i++) {
            // All submitted sorted teams must be registered
            require(bytes(teams[_sortedTeams[i]].name).length > 0);

            // The sorted teams must be sorted correctly
            require(i == _sortedTeams.length - 1 || teams[_sortedTeams[i + 1]].score <= teams[_sortedTeams[i]].score);
        }

        uint _partOfPrizePool = 2;

        for (uint j = 0; j < _sortedTeams.length - 1; j++) {
            uint _prizeAmount = totalContribution / _partOfPrizePool;

            if (teams[_sortedTeams[j]].rewardEligable) {
                _partOfPrizePool *= 2;

                _sortedTeams[j].transfer(_prizeAmount);
                PrizePaid(teams[_sortedTeams[j]].name, _prizeAmount);
            }
        }
    }

    function restartPeriod() onlyOwner {
        currentPeriod = Period.Registration;
    }
}