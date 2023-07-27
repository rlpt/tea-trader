import { getRngTables } from "./rngTable";
import seedrandom from "seedrandom";

test("rngTable", () => {
    const table = getRngTables("testseed");

    console.log(table);
});
