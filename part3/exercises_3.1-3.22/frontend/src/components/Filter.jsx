const Filter = ({ query, handlequeryChange  }) => {

    return <input 
        value={query} 
        onChange={handlequeryChange}
    />
}

export default Filter