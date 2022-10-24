import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../images/logo.png';
import { BiExit } from 'react-icons/bi';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    border-bottom: 1px solid gray;
`;

const Logo = styled.img`
    max-width: 200px;
    align-self: flex-start;
`;

const IconExit = styled.div`
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin: 0 20px;
    justify-content: flex-end;
`;

interface INav {
    onLogout?: () => void;
}

const Nav: FunctionComponent<INav> = ({ onLogout }) => {
    return (
        <Wrapper>
            <Link to="/">
                <Logo src={logoImg} alt="logotipo da empresa" />
            </Link>

            {onLogout ? (
                <IconExit onClick={() => onLogout()}>
                    <BiExit />
                </IconExit>
            ) : (
                <></>
            )}
        </Wrapper>
    );
};

export default Nav;
