import Graph from "react-graph-vis";
import React, { useState } from "react";
import ReactDOM from "react-dom";


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000",
    physics: false
  },
  nodes: {
    color : "#F9CD7E",
    physics : false
  }
};

const App = () => {
  const createNode = (x, y) => {
    const color = "#F9CD7E";
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `Problem ${id}`, color, x, y }
          ],
          edges: [
            ...edges,
            { from, to: id }
          ]
        },
        counter: id,
        ...rest
      }
    });
  }
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: "Two Sum", color: "#F9CD7E" },
        { id: 2, label: "Add Two Numbers", color: "#F9CD7E" },
        { id: 3, label: "Longest Substring Without...", color: "#F9CD7E" },
        { id: 4, label: "Median of Two Sorted Arrays", color: "#F9CD7E" },
        { id: 5, label: "Longest Palindromic Substring", color: "#F9CD7E" }
      ],
      edges: [
        { from: 1, to: 2},
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]

    },
    events: {
      select: ({ nodes, edges }) => {
        /*console.log("Selected nodes:");
        console.log(nodes);
        console.log("You have selected the edge");
        console.log(edges);
        alert("Selected node: " + nodes); */
        nodes.borderColor = "#e04141"
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      }
    }
  })
  const { graph, events } = state;
  return ( 
    <div>
      <h1 style={{textAlign: "center"}}>Leetcode Graph Visualisation</h1>
      <Graph graph={graph} options={options} events={events} style={{ height: "100vh", width: "100%" }} />
    </div>
  );

}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);