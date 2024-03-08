import React, { PureComponent } from "react";

export class ComponentLoader extends PureComponent {
  render() {
    return (
      <div className="relative w-[100%] flex items-center justify-center h-[300px] ">
        <div class="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default ComponentLoader;
