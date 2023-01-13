export default function NodeInput({network}) {

    function focusOnNode(node, network) {
        var options = {
            scale: 1.0,
            offset: { x: 0, y: -100 },
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuad",
            },
        };
        
        network.focus(node, options);
    }

    function onSubmitEvent(e) {
        e.preventDefault();

        focusOnNode((e.target)[0].value, network);
    }
    
    return (
        <div style={{textAlign: "center"}}>
            <form data-testid='form' onSubmit={onSubmitEvent}>
                <label> Enter question number to focus on:  </label>
                <input type='text' id='alert' name='alert' />
                <button type='submit'> Enter </button>
            </form>
      </div>
    )
  }