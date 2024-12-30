import './App.css';
import Ui from './Ui';

function App() {

  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('https://images.pexels.com/photos/80476/hayden-valley-yellowstone-valley-landscape-80476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-no-repeat bg-center">
      {/* UI Component */}
      <div className="w-full flex justify-center py-10">
        <Ui />
      </div>
    </div>
  );
}

export default App;
