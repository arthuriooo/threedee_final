import React from "react"
import styled, { keyframes } from 'styled-components'
import * as images from './static/images'

const Logo = require('./static/logo.PNG')
const Beton = require('./static/beton.jpg')

const Page = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: auto;
margin: 0;
display: flex;
flex-direction: column;
justify-content: center;

background-image: url(${Beton});
background-repeat: repeat;
`

// const PageWrapper = styled.div`
// position: relative;
// width: 100%;
// height: 100%;
// top: 0;
// left: 0;
// `

const Header = styled.div`
width: 100%;
height: 70px;
color: purple;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
font-size: 30px;

padding: 20px;
`

const WrapperOfWrapper = styled.div`
position: relative;
height: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
height: 10em;
width: 10em;
margin: 20px;


perspective: 1000px;
perspective-origin: center -5em;
`

const Container = styled.div`
transform-style: preserve-3d;
animation: rotate 10s infinite linear;
width: 100%;
height: 100%;
transform: rotateY(0deg) rotateX(0deg);
transition: 0.8s ease-in-out;

&:hover {
transform: ${props =>
    props.side === 'Bottom' ? 'rotateX(90deg)' :
      props.side === 'Left' ? 'rotateY(90deg)' :
        props.side === 'Right' ? 'rotateY(-90deg)' :
          'rotateY(90deg)'};
}
`

const Side = styled.div`
position: absolute;
width: 10em;
height: 10em;
opacity: 1;
border: 1px solid purple;

transform: ${props =>
    props.side === 'Left' ? 'translateX(-5em) rotateY(270deg)' :
      props.side === 'Right' ? 'translateX(5em) rotateY(90deg)' :
        props.side === 'Top' ? 'translateY(-5em) rotateX(90deg)' :
          props.side === 'Bottom' ? 'translateY(5em) rotateX(270deg)' :
            ''};
/* background-color: ${props => props.side === 'Top' ? 'white' : null}; */
background-image: url(${props => props.side !== 'Top' ? props.backImage : Logo});

background-size: cover;
`

const Back = styled(Side)`
transform: translateZ(-5em);
`

const Front = styled(Side)`
transform: translateZ(5em);
background-image: url(${props => props.backImage});
background-size: cover;
opacity: 1;
`

const LoadingAnimation = keyframes`
0% {
  width: 200px;
  height: 200px;
  transform: translateX(-100px) translateY(-100px) rotate(0deg);
}
50% {
  width: 100px;
  height: 100px;
  transform: translateX(-50px) translateY(-50px) rotate(360deg);
}
100% {
  width: 200px;
  height: 200px;
  transform: translateX(-100px) translateY(-100px) rotate(0deg);
}
`

const Loader = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  /* top: 50vh; */
  /* left: 50vw; */
  transform: translateX(-100px) translateY(-100px);
  background-image: url(${Logo});
  background-size: cover;
  animation: ${LoadingAnimation} 2s ease-in-out 0s infinite;
`

const LogoWrapper = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 20px 0 0;
`

const sides = ['Bottom', 'Left', 'Right', 'Top']


class App extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    images.originals.forEach((original) => {
      const img = new Image();
      img.src = original.fileName;
    });

    images.edited.forEach((edited) => {
      const img = new Image();
      img.src = edited.fileName;
    });

    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  render() {
    const { loading } = this.state

    return (
      <Page>
        {loading ? <Loader /> :
          (
            <>
              <Header>
                <LogoWrapper src={Logo} alt={'logo'} /><span>GANIMAPP</span>
              </Header>
              <WrapperOfWrapper>
                {images.originals.map((image, imageIndex) => {
                  const random = Math.floor(Math.random() * 3);

                  return <Wrapper key={image}>
                    <Container side={random === 0 ? 'Bottom' : random === 1 ? 'Left' : random === 2 ? 'Right' : 'Left'}>
                      <Back />

                      {sides.map((side, index) => {
                        return <Side side={side} backImage={index === random ? images.edited[imageIndex] : ''} />
                      })}

                      <Front backImage={image} />
                    </Container>
                  </Wrapper>
                })}
              </WrapperOfWrapper>
            </>
          )}

      </Page>

    )
  }
}

export default App
