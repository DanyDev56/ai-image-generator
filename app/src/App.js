import { ImageGenerator } from './components/ImageGenerator/ImageGenerator';
import styled from 'styled-components'

const AppWrapper = styled.div`
  text-align: center;
`

function App() {
  return (
    <AppWrapper>
      <ImageGenerator />
    </AppWrapper>
  );
}

export default App;
