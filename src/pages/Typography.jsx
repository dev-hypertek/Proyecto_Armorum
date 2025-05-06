import React from "react";

const Typography = () => {
  return (
    <div className="mt-4 p-4">
      <h1 className="text-xl mx-6 font-semibold">Typography</h1>
      <div className="border mx-6 my-6 shadow-md">
        <div className="my-2 mx-2">
          <h1 className="text-lg font-medium my-2">Card Category</h1>
          <p className="text-gray-400 text-sm pb-1">Card Category</p>
        </div>
        <div className="border w-full"></div>
        <div className="mx-4 my-2">
          <div className="border-t py-6 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 1</div>
            <div className="text-5xl">h1. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t py-5 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 2</div>
            <div className="text-4xl">h2. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t py-4 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 3</div>
            <div className="text-3xl">h3. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t py-3 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 4</div>
            <div className="text-2xl">h4. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-2 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 5</div>
            <div className="text-xl">h5. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-center ">
            <div className="text-sm">Header 6</div>
            <div className="text-lg">h6. Bootstrap heading</div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-center ">
            <div className="text-sm">Paragraph</div>
            <div className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Quote</div>
            <div>
              <blockquote className="text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </blockquote>
              <cite className="block mt-2 text-sm  text-gray-500">– Noaa</cite>
            </div>


          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Primary Text</div>
            <div className="text-sm pr-8 text-blue-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </div>


          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Info Text</div>
            <div className="text-sm text-start text-sky-300">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </div>


          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Success  Text</div>
            <div className="text-sm text-start text-green-300">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </div>


          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t  py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Warning Text</div>
            <div className="text-sm text-start text-orange-300">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </div>


          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="border-t py-1 flex justify-start gap-24 items-end ">
            <div className="text-sm ">Danger Text</div>
            <div className="text-sm text-start text-red-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </div>
          </div>
        </div>
        <div className="w-full border mb-4 "></div>
        <div className="border-t mx-2 py-4">
              <p className="text-sm">Card Footer</p>
        </div>
      </div>
    </div>
  );
};

export default Typography;
