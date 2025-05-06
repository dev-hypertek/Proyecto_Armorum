import Tasks from "../Tasks"
import Table from "./Table"

const TableTaskContainer = () => {
     return (
          <div className="my-6 mx-6 flex gap-6 items-start">
               <Table />
               <Tasks/>
          </div>
     )
}

export default TableTaskContainer