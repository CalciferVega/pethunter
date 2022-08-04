const Filter = () => {
    return(
    <section className='animalFilter'>
                <button className='active' dataPet="all">Todos</button>
                <button dataPet="cat">Gatos</button>
                <button dataPet="dog">Perros</button>
                <button dataPet="rabbit">Conejos</button>
                <button dataPet="hamster">Hamster</button>
    </section>
    )
}

export default Filter;