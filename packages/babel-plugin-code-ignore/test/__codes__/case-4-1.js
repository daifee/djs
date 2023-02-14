import React from 'react';

// 问答框
function Dialog() {

  return (<div className="dialog" />)
}

function Main() {

  return (
    <div id="main">
      {/* @code-ignore-next-jsx-element kuwo */}
      <Dialog id="global" key="global" />
      <div>1111111</div>
      <Dialog>222222</Dialog>
      {/* @code-ignore-next-jsx-element kuwo */}
      <>
        <div>333333333</div>
      </>
    </div>
  );
}