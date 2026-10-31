import styled from 'styled-components'

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px 0;
  padding: 20px;
  background-color: #f4f6f8;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  font-weight: 500;
  color: #374151;
`

export const StyledInput = styled.input`
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`

export const StyledButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: #1d4ed8;
  }
`

//Estilos para la barra de navegación y notificaciones
export const NavContainer = styled.nav`
  background-color: #1976d2; /* Azul estilo Material UI / Bootstrap */
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`

export const NavBrand = styled.span`
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  button {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 13px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`

export const NotificationBox = styled.div`
  background-color: ${props => props.type === 'error' ? '#fde8e8' : '#e6f4ea'};
  color: ${props => props.type === 'error' ? '#c53030' : '#137333'};
  border: 1px solid ${props => props.type === 'error' ? '#f5c6cb' : '#c6efce'};
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`

// Contenedor detalle del blog
export const BlogCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  max-width: 650px;
`

export const BlogDetailTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
  margin-top: 0;
`

export const BlogInfoText = styled.p`
  color: #4a5568;
  font-size: 15px;
  margin: 8px 0;

  a {
    color: #3182ce;
    text-decoration: underline;
    word-break: break-all;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  font-weight: 500;
  color: #2d3748;
`

// Botón de Like con estilo de borde (Outline)
export const LikeButton = styled.button`
  background-color: #ffffff;
  color: #3182ce;
  border: 1px solid #3182ce;
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: all 0.2s;

  &:hover {
    background-color: #ebf8ff;
  }
`

// Botón de Remove con borde rojo sutil
export const DeleteButton = styled.button`
  background-color: #ffffff;
  color: #e53e3e;
  border: 1px solid #e53e3e;
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: all 0.2s;

  &:hover {
    background-color: #fff5f5;
  }
`