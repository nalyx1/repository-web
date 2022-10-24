import styled from 'styled-components';
import { useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Wrapper = styled.div`
    display: flex;
    align-self: center;
    justify-content: center;
    max-width: 900px;
    margin: 40px auto;
    gap: 10px;
`;

const SearchInput = styled.input`
    flex: 1;
    background: rgb(18, 18, 20);
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    height: 40px;
    padding: 15px 21px;
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
`;

const SearchButton = styled.button`
    height: 40px;
    max-width: 200px;
    flex: 1;
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    background: rgb(130, 87, 229);
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
    cursor: pointer;
`;

const NewRepository = styled(Link)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgb(130, 87, 229);
    border-radius: 5px;
    max-width: 100px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
    text-decoration: none;
`;

interface ISearch {
    onSearch: (query: string) => void;
}

const Search: FunctionComponent<ISearch> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    return (
        <Wrapper>
            <SearchInput
                type="text"
                placeholder="Pesquise algum repositorio..."
                onChange={e => setQuery(e.target.value)}
            />
            <SearchButton onClick={() => onSearch(query)}>Pesquisar</SearchButton>

            <NewRepository to="/create-repository">
                <IconContext.Provider
                    value={{ size: '1.2em', style: { color: 'rgb(255, 255, 255)', margin: '0 5px 0 0' } }}
                >
                    <AiOutlinePlusCircle /> Novo
                </IconContext.Provider>
            </NewRepository>
        </Wrapper>
    );
};

export default Search;
