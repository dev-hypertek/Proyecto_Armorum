import React from 'react';
import WorldMap from 'react-svg-worldmap';

const Map = () => {
     const data = [
          { country: "cn", value: 1389618778 },
          { country: "in", value: 1311559204 },
          { country: "us", value: 331883986 },
          { country: "id", value: 264935824 },
          { country: "pk", value: 210797836 },
          { country: "br", value: 210301591 },
          { country: "ng", value: 208679114 },
          { country: "bd", value: 161062905 },
          { country: "ru", value: 141944641 },
          { country: "mx", value: 127318112 },
     ];

     return (
          <div className="w-[800px]  px-5 h-[300px] mt-5 flex justify-center  items-center">
               <WorldMap
                    color="green"
                    value-suffix="people"
                    size="md"
                    data={data}
               />
          </div>
     );
};

export default Map;
