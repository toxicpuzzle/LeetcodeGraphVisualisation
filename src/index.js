import Graph from "react-graph-vis";
import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import NodeInput from "./components/NodeInput"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        counter: 5,
        graph: {
          nodes: [
            { id: 1, label: "1. Two Sum", color: "#F9CD7E" },
            { id: 2, label: "2. Add Two Numbers", color: "#F9CD7E" },
            { id: 3, label: "3. Longest Substring Without...", color: "#F9CD7E" },
            { id: 4, label: "4. Median of Two Sorted Arrays", color: "#F9CD7E" },
            { id: 5, label: "5. Longest Palindromic Substring", color: "#F9CD7E" }
          ],
          edges: [
            { from: 1, to: 2},
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
          ]
    
        },
        'events': {
          select: ({ nodes, edges }) => {
            var options = {
              scale: 1.0,
              offset: { x: 0, y: -100 },
              animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad",
              },
            };
          
            this.network.focus(nodes, options);
            console.log(edges);
          },
          doubleClick: ({ pointer: { canvas } }) => {
            alert("x : " + canvas.x + "; y : " + canvas.y + ";");
          }
        },
        'options' : {
          layout: {
            hierarchical: false
          },
          edges: {
            color: "#000000",
            physics: false
          },
          nodes: {
            color : "#F9CD7E",
            physics : true
          },
          physics: {
            barnesHut: {
              avoidOverlap: 0.5
            }
          }
        },
        'network': null,
    }
    this.setNetworkInstance = this.setNetworkInstance.bind(this);
  }

  handleChange(input) {
    console.log(input.target.value);
  }

  setNetworkInstance(nw) {
    this.setState({
        network: nw,
    });
    this.network = nw;
  } 
  
    render() { 
      return ( 
      <div>
        <h1 style={{textAlign: "center"}}>Leetcode Graph Visualisation</h1>
        <NodeInput network={this.network}/>
        <Graph graph={this.state.graph} 
              options={this.state.options} 
              events={this.state.events} 
              style={{ height: "100vh", width: "100%" }}
              getNetwork={this.setNetworkInstance}
        />
      </div>
      );
    } 

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);