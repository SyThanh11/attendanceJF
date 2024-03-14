import { useRoutes } from "react-router-dom"
import { route } from "routes"

function App() {

  return (
    <div>
      {
        useRoutes(route)
      }
    </div>
  )
}

export default App
