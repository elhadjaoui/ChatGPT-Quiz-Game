import React from 'react';
import Debrief from './Debrief';
import Quizz from './Quizz';
const App = () => {

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <div className="tabs  mt-4">
      <div onClick={ () => setActiveTab(0)} className={`tab tab-lifted  ${activeTab === 0 ?  "tab-active" : "" } `}>Quizz Game</div>
    <div onClick={() => setActiveTab(1)} className={`tab  tab-lifted ${activeTab === 1  ?  "tab-active" : ""} `}>Match Debrief</div>
        
      </div>
      {activeTab === 0 ? <Quizz /> : <Debrief/>}
    </div>
  )

};

export default App;
