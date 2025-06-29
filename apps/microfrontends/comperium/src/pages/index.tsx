import Component1 from '@/components/Component1';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <div className="bg-green-500 text-white p-8">Hola Tailwind en remote 🎉</div>
      <div>
        <Component1 text="hola"></Component1>
      </div>
    </>
  );
}

export default Index;
