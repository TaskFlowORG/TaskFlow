import { useState } from "react";

export const RadioFilter = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event:any) => {
    setSelectedOption(event.target.value);
  };
 
  return (
    <div>
      <p>sasdad</p>
      <div className="flex w-full overflow-scroll">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="whitespace-nowrap">
          <input
            type="radio"
            id={`radio${index}`}
            name="radioGroup"
            value={`Option ${index + 1}`}
            checked={selectedOption === `Option ${index + 1}`}
            onChange={handleOptionChange}
          />
          <label htmlFor={`radio${index}`}>{`Option ${index + 1}`}</label>
        </div>
      ))}
      </div>
      
    </div>
  );
};
