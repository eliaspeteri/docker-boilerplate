export function TodoList() {
  return (
    <section className='py-8 float-left'>
      <h1 className='text-3xl'>TODO</h1>
      <ul className='flex flex-col p-8'>
        <li className='text-left'>
          <input type='checkbox' checked readOnly /> list of images
        </li>
        <li className='text-left'>
          <input type='checkbox' checked readOnly /> printing options
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> copy to clipboard
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> create Dockerfiles
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> zip and save to
          computer
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> more service
          configurations
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> more quick options
        </li>
        <li className='text-left'>
          <input type='checkbox' checked={false} readOnly /> deploy to github
          pages
        </li>
      </ul>
    </section>
  );
}
