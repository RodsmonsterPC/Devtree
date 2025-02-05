import { useState } from "react"
import { social } from "../data/social"

social

const LinkTreeView = () => {

  const [devTreeLinks, setDevTreeeLinks] = useState(social)

  console.log(devTreeLinks)


  return (
    <div>
      Linktree
    </div>
  )
}

export default LinkTreeView

