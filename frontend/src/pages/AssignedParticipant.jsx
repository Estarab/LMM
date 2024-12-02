




import { useLocation } from 'react-router-dom';

const AssignedParticipant = () => {
  const location = useLocation();
  const { selectedParticipant, userDetails } = location.state || {};

  if (!selectedParticipant) {
    return <div>Error: No participant found</div>; // Return an error message if no participant is found
  }

  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Assigned Participant</h2>
      <div className="flex flex-col items-center">
        <img
          src={selectedParticipant.photo || 'https://via.placeholder.com/150'}
          alt={selectedParticipant.name}
          className="w-40 h-40 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{selectedParticipant.name}</h3>
        <p>{selectedParticipant.phone}</p>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg">You are buying a gift for:</h3>
        <p className="text-2xl font-semibold">{userDetails.name} {userDetails.surname}</p>
        <p className="text-lg">{userDetails.phone}</p>
      </div>
    </div>
  );
};

export default AssignedParticipant;
