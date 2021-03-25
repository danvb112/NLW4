import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../Challenges.json';

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
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completChallenge: () => void;
}


interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengeProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null) ;

    const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2);


    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const radomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[radomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('./notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio!!!', {
                body: `Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completChallenge,
                experienceToNextLevel
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}