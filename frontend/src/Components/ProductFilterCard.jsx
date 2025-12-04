export default function ProductFilterCard({ selectedFilter, handleOnFilterSelect }) {
  return (
    <div>
      <form action="">
        <h3>Filter Price</h3>
        <label htmlFor="product-filter">See All</label>
        <input type="radio" name="product-filter" id="" value={0.0} checked={selectedFilter == 0.0} onChange={(e) => handleOnFilterSelect(e)} />
        <br />
        <label htmlFor="product-filter">{"< $1.00"}</label>
        <input type="radio" name="product-filter" id="" value={1.0} checked={selectedFilter == 1.0} onChange={(e) => handleOnFilterSelect(e)}/>
        <br />
        <label htmlFor="product-filter">{"< $2.00"}</label>
        <input type="radio" name="product-filter" value={2.0} checked={selectedFilter == 2.0} onChange={(e) => handleOnFilterSelect(e)}/>
        <br />
        <label htmlFor="product-filter">{"< $4.00"}</label>
        <input type="radio" name="product-filter" value={4.0} checked={selectedFilter == 4.0} onChange={(e) => handleOnFilterSelect(e)}/>
        <br />
        <label htmlFor="product-filter">{"< $6.00"}</label>
        <input type="radio" name="product-filter" value={6.0} checked={selectedFilter == 6.0} onChange={(e) => handleOnFilterSelect(e)}/>
        <br />
        <label htmlFor="product-filter">{"< $9.00"}</label>
        <input type="radio" name="product-filter" value={9.0} checked={selectedFilter == 9.0} onChange={(e) => handleOnFilterSelect(e)}/>
        <br />
      </form>
    </div>
  );
}
