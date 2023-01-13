/* NodeInput component contains main functionality for handling the input box  
    and focusing on a node */

export default function NodeInput({network}) {

    // focus on node entered into input box
    function onSubmitEvent(e) {
        e.preventDefault();

        var options = {
            scale: 1.0,
            offset: { x: 0, y: -100 },
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuad",
            },
        };
        
        const node = (e.target)[0].value
        network.focus(node, options);
    }
    
    // html for "focus on node" text input box
    return (
        <div style={{textAlign: "center"}}>
            <form data-testid='form' onSubmit={onSubmitEvent}>
                <label>To centre a node, click on it or enter the number below: </label><br></br>
                <input type='text' id='alert' name='alert' />
                <button type='submit'> Enter </button>
            </form>
      </div>
    )
  }