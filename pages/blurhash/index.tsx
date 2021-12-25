import { getPlaiceholder } from "plaiceholder";

const BlurHash = () => {
    return (
        <p>dev</p>
    )
}

export const getStaticProps = async () => {
    const {base64} = await getPlaiceholder('https://firebasestorage.googleapis.com/v0/b/pjsekai-song-wishlist.appspot.com/o/songs%2FOhONKco5EhtkGEXF7gSC%2Fcrazybeat.webp?alt=media&token=d6615fcf-379a-4327-a685-d0b74782e20a');
    console.log(base64)
    return {
        props:{

        }
    }

};

export default BlurHash;
