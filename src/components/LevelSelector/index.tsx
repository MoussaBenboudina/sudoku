import { difficultyProp } from "../../type";

const LeveleSelect = ({
  difficulty,
  setDifficulty,
}: {
  difficulty: difficultyProp;
  setDifficulty: (difficulty: difficultyProp) => void;
}) => {
  return (
    <div>
      <select
        className="w-40 border-2 py-2 text-center rounded-md shadow-md m-2"
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as difficultyProp)}
      >
        <option value="easy" className="w-20">
          Easy
        </option>
        <option value="medium" className="w-20">
          Medium
        </option>
        <option value="hard" className="w-20">
          Hard
        </option>
      </select>
    </div>
  );
};

export default LeveleSelect;
