export const ErrorComponent = () => {
  const main: HTMLElement | null = document.getElementById('app');
  (<HTMLElement>main).innerHTML  = `
        <section>
          <h1>Error</h1>
          <p>This is just a Error</p>
        </section>
      `;
    
}

