import { tableData } from "../../const";

const BorderedTable = () => {
  return (
    <div className="border shadow-md pt-4 my-6 w-full">
      <h1 className="text-xl font-medium py-4 mx-4 ">Bordered Table</h1>

      <div className="border-b border-gray-300 w-full"></div>

      <div className="my-6">
        <div className="border mx-4 h-auto py-2 px-2 text-sm  bg-gray-100">
          Add <span className="text-[#e83e8c]">.table-bordered</span> to create
          a bordered table
        </div>

        <div className="mx-4 my-6">
          <table className="w-full ">
            <thead>
              <tr className="border-t border text-left">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">First </th>
                <th className="px-4 py-2 border">Last</th>
                <th className="px-4 py-2 border">Handle</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((items) => (
                <tr
                  key={items.id}
                  className="text-start border-t hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border">{items.id}</td>
                  <td className="px-4 py-2 border">{items.firstName}</td>
                  <td className="px-4 py-2 border">{items.lastName}</td>
                  <td className="px-4 py-2 border">{items.handle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="my-6">
          <div className="border mx-4 h-auto py-2 px-2 text-sm  bg-gray-100">
            You can also add{" "}
            <span className="text-[#e83e8c]">.table-bordered-bd-*states</span>{" "}
            to change the border color of the table
          </div>
        </div>

        <div className="mx-4 my-6">
          <table className="w-full ">
            <thead>
              <tr className="border-t border text-left">
                <th className="px-4 py-2 border border-orange-300">#</th>
                <th className="px-4 py-2 border border-orange-300">First </th>
                <th className="px-4 py-2 border border-orange-300">Last</th>
                <th className="px-4 py-2 border border-orange-300">Handle</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((items) => (
                <tr
                  key={items.id}
                  className="text-start border-t border-orange-300 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border border-orange-300">
                    {items.id}
                  </td>
                  <td className="px-4 py-2 border border-orange-300">
                    {items.firstName}
                  </td>
                  <td className="px-4 py-2 border border-orange-300">
                    {items.lastName}
                  </td>
                  <td className="px-4 py-2 border border-orange-300">
                    {items.handle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="my-6">
          <div className="border mx-4 h-auto py-2 px-2 text-sm  bg-gray-100">
          It can also add
            <span className="text-[#e83e8c]">.table-bordered-bd-*states</span>{" "}
            so that the table header has the same color as the border color of the table          </div>
        </div>

        <div className="mx-4 my-6">
          <table className="w-full ">
            <thead>
              <tr className=" border text-left bg-sky-400 text-white">
                <th className="px-4 py-2 border border-sky-400">#</th>
                <th className="px-4 py-2 border border-sky-400">First </th>
                <th className="px-4 py-2 border border-sky-400">Last</th>
                <th className="px-4 py-2 border border-sky-400">Handle</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((items) => (
                <tr
                  key={items.id}
                  className="text-start border-t border-sky-400 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border border-sky-400">
                    {items.id}
                  </td>
                  <td className="px-4 py-2 border border-sky-400">
                    {items.firstName}
                  </td>
                  <td className="px-4 py-2 border border-sky-400">
                    {items.lastName}
                  </td>
                  <td className="px-4 py-2 border border-sky-400">
                    {items.handle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BorderedTable;
