// AnonymousSportsVoting Contract ABI
export const CONTRACT_ABI = [
  "function admin() view returns (address)",
  "function currentEventId() view returns (uint32)",
  "function authorizedVoters(address) view returns (bool)",
  "function candidates(uint32) view returns (string name, string category, bool isActive)",
  "function events(uint32) view returns (string eventName, string description, uint256 startTime, uint256 endTime, uint256 revealStartTime, uint256 revealEndTime, bool isActive, bool resultsRevealed, uint32 totalVotes, uint32 winnerId)",
  "function authorizeVoter(address _voter)",
  "function revokeVoter(address _voter)",
  "function addCandidate(string memory _name, string memory _category) returns (uint32)",
  "function createVotingEvent(string memory _eventName, string memory _description, uint32[] memory _candidateIds) returns (uint32)",
  "function castVote(uint32 _eventId, bytes32 encryptedVote, bytes memory proof)",
  "function hasVoted(uint32 _eventId, address _voter) view returns (bool)",
  "function getEventCandidates(uint32 _eventId) view returns (uint32[] memory)",
  "function getVoteCount(uint32 _eventId, uint32 _candidateId) view returns (uint32)",
  "event EventCreated(uint32 indexed eventId, string eventName, uint256 startTime, uint256 endTime)",
  "event CandidateAdded(uint32 indexed candidateId, string name, string category)",
  "event VoteCast(address indexed voter, uint32 indexed eventId)",
  "event VotingEnded(uint32 indexed eventId, uint256 timestamp)",
  "event ResultsRevealed(uint32 indexed eventId, uint32 winnerId, uint32 totalVotes)",
  "event VoterAuthorized(address indexed voter)",
  "event VoterRevoked(address indexed voter)"
];

export const CONTRACT_ADDRESS = "0x3825C6a1BAf65d3fF39C3e0cEbbe4b76D2567488";
