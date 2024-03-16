import { useRoutes } from "react-router-dom"
import { route } from "routes"

function App() {

  return (
    <div className="h-[100vh]">
      {
        useRoutes(route)
      }
    </div>
  )
}

export default App
