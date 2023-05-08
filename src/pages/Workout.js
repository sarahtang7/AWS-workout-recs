import { useParams } from 'react-router-dom';
import WorkoutDetails from '../components/WorkoutDetails/WorkoutDetails';

function Workout() {
  const { id } = useParams();

  return (
    <div>
      <WorkoutDetails id={id} />
    </div>
  );
}

export default Workout;
