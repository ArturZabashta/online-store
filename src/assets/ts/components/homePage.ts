export const HomeComponent = {
    render: () => {
      return `
      <div class="shop">
        <aside class="shop__filters">
          <div class='filter-item'>
            <h3>Category</h3>
            <div class="select">
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
              <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
            <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
            <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
            </div>
          </div>
          <div class='filter-item'>
            <h3>Brand</h3>
            <div class="select">
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
              <label for="checkbox-1">
                <input value="1" id="checkbox-1" type="checkbox">
                Checkbox #1
              </label>
            </div>
          </div>
          <div class='filter-item'>
            <h3>Price</h3>
            <div class="multi-range">
              <input id="min" type="range" min="0" max="100" value="0" step="0.0001">
              <input id="max" type="range" min="0" max="100" value="100" step="0.0001">
            </div>
            <div class='price'>
              <span id='from'>€10.00</span>
              <span id='to'>€1749.00</span>
            </div>
          </div>
          <div class='filter-item'>
          <h3>Stock</h3>
          <div class="multi-range">
            <input id="min" type="range" min="0" max="100" value="0" step="0.0001">
            <input id="max" type="range" min="0" max="100" value="100" step="0.0001">
          </div>
          <div class='price'>
            <span id='from'>2</span>
            <span id='to'>150</span>
          </div>
        </div>
        </aside>
        <section class="shop__items">
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        <div class = 'item'></div>
        </section>
      </div>
      `;
    }
  } 