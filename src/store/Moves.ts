import create from 'zustand';

interface Moves {
    id: number;
    name: string;
    image: string;
}

export interface Result {
    winner: string;
    outcome: string;
    loser: string;
}

interface MovesStore {
    moves: Moves[];
    choosedmove: Moves;
    result: Result;
    computerMove: Moves;
    fetchOk: boolean;
    getChoosedMove: () => Moves;
    updateMoves: (moves: Moves) => void;
    chooseMove: (id: number) => void;
    setResult: (result: Result) => void;
    getResult: () => Result;
    setComputerMove: (computerMove: number) => void;
    getComputerMove: () => Moves;
    setFetchOk: (fetchOk: boolean) => void;
    getFetchOk: () => boolean;
}

export const useMovesStore = create<MovesStore>((set, get) => ({
    moves: [],
    choosedmove: { id: 0, name: '', image: '' },
    result: { winner: '', outcome: '', loser: '' },
    computerMove: { id: 0, name: '', image: '' },
    fetchOk: false,
    getChoosedMove: () => get().choosedmove,
    updateMoves: (moves: Moves) => set((state) => ( { moves: [...state.moves, moves] })),
    chooseMove: (id: number) => set((state) => ({ choosedmove: state.moves.find((move) => move.id === id) })),
    setResult: (result: Result) => set((state) => ({ result: { ...state.result, ...result } })),
    getResult: () => get().result,
    setComputerMove: (id: number) => set((state) => ({ computerMove: state.moves.find((move) => move.id === id) })),
    getComputerMove: () => get().computerMove,
    setFetchOk: (fetchOk: boolean) => set((state) => ({ fetchOk: fetchOk })),
    getFetchOk: () => get().fetchOk,
}));
