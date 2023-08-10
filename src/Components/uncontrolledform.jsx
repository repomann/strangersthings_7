const Form = () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
  ​
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
  ​
      console.log(formJson)
    }
    return <form method="post" onSubmit={handleSubmit}>
      <h3>Uncontrolled Form:</h3>
  ​
      <label>
        Username:
        <input name="username" defaultValue={"aaron"} />
      </label>
  ​
      <hr />
  ​
      <label>
        Checkbox:{" "}
        <input type="checkbox" name="myCheckbox" value={'random value is checked'} />
      </label>
  ​
      <hr />
  ​
      <p>
        Radio buttons:
        <label>
          <input type="radio" name="myRadio" value="option1" /> Option 1
        </label>
  ​
        <label>
          <input
            type="radio"
            name="myRadio"
            value="option2"
          />
          Option 2
        </label>
  ​
        <label>
          <input type="radio" name="myRadio" value="option3" /> Option 3
        </label>
      </p>
  ​
      <hr />
  ​
      <button type="reset">Reset form</button>
      <button type="submit">Submit form</button>
    </form>
  }
  ​
  export default Form;