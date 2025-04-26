import React from "react";

class Counter extends React.Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("constructor");
  }

  componentDidMount(): void {
    this.setState({ count: 1 })
    console.log("componentDidMount");
  }

  // componentDidUpdate(prevProps: never, prevState: { count: number }) {
  //   console.log("componentDidUpdate");
  //   if(this.state.count === 10) {
  //     this.setState({ count: 0})
  //   }
  // }

  render() {
    console.log("render");
    return (
      <>
        <div className="flex justify-center items-center gap-2 bg-black text-white py-5">
          <h1 className="text-5xl">{this.state.count}</h1>
          <button
            className="text-5xl"
            type="button"
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Count!!!
          </button>
        </div>
        <hr />
      </>
    );
  }
}

export default Counter;