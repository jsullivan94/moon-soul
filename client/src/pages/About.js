const members = [
        {
                name: 'Theo Moore',
                image: '/pictures/theo.jpeg',
                description: `Theo Moore has been playing congas, bongos and various percussion instruments for 23 years.
                He has also played and contributed to Jazzotree, David Sanford Big Band, Urban Sun, Hokumfactory,
                Yellowcake, OTiS, Phantom Pop, JSWISS, The Saturators, Blind Faith Records, and Funkallisto.
                
                He is into Motown, 70’s Funk/Soul, Fusion, Latin, World Music, Hip Hop, Classic Rock and his major
                influences are Eddie “Bongo” Brown, “Master” Henry Gibson, Bobbye Hall Porter,Mongo, Giovanni
                Hidalgo, Poncho Sanchez, Cyril Neville, Pucho Brown, Lenny Castro... plus many others!
                
                Outside of music he holds a BFA in Painting from UMass, is a professional graphic artist, and enjoys
                painting, drawing, sports, travel, and politics.`
        },
        {
                name: 'James Sullivan',
                image: '/pictures/james.jpg',
                description: `James Sullivan has been playing guitar for 17 years. He holds a Bachelor's of Music from 
                the City College of New York, specializing in jazz performance. Before pursuing music, he worked as a chef 
                for several years. Now, alongside his music career, James Sullivan is exploring the field of software technology.`
        },
        {
                name: 'Brian Price',
                image: "/pictures/brian.jpg",
                description: `Multi-instrumentalist Brian Price’s calendar is full of a wide variety of musical projects, performing 
                primarily on tenor saxophone, bass clarinet, and clarinet. Recent gigs in the New York and Boston area have included 
                both long-standing collaborations and new projects with Cooper-Moore, Tom Palance, Joe Pino, Nick Consonse, the Arcanauts, 
                Charlie Kohlhase’s Explorer’s Club, and Moon Soul. Brian has played throughout the United States and Europe with Cooper-Moore 
                as well as a member of the Lost and Wandering Blues and Jazz Band. His schedule ranges from theatres to clubs to community
                non-profit groups. He grew up playing music with his father and was mentored on saxophone and bass clarinet by Leonard Hochman.`
        },
        {
                name: 'Jeremy',
                image:"/pictures/jeremy.jpg",
                description: ``
        },
        {
                name: 'Jett Carter',
                image: "/pictures/jett.jpg",
                description: ``
        },
        {
                name: 'Riff',
                image: "/pictures/rif.jpg",
                description: ``
        }

];

function Member({ name, image, description }) {
        return (
                <>
                <h1 className="about-title">{name}</h1>
                <img className="about-profile-image" src={image} alt={name} />
                <p className="about-description">{description}</p>
                </>
        );
}
        
function About() {
        return (
                <div className="about-container">
                <img className="about-header-image" src='/pictures/Moon_Soul.jpeg' alt="Moon Soul" />
                {members.map(member => <Member key={member.name} {...member} />)}
                </div>
        );
}
        
export default About;