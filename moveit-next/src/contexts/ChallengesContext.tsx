import { createContext, useState, ReactNode } from 'react'
import challenges from '../../Challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: String;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
}


interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengeProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null) 

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const radomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[radomChallengeIndex]

        setActiveChallenge(challenge)
    }


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}