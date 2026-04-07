export class Node {
    private children: Node[];
    //constructor(tag: string, terminal: Object);
    constructor(private tag: string){
        this.children = [];
    }

    public getDot(): string {
        return ` digraph AST {
        graph [fontname = "Consolas", bgcolor = "#252526"];
        node [fontname = "Consolas", shape=rectangle, with="0" fontsize="8", height="0", color="black", fontcolor="white"];
        edge [color="white"]; ${this.getNodes("i")}
        }
        `
    }

    private getNodes(tag:string): string {
        let dot: string = `\n\tnode_${tag}[label="${this.tag}"];`;
        for (let i = 0; i < this.children.length; i++) {
            dot += this.children[i].getNodes(tag + i);
            dot += `\n\tnode_${tag} -> node_${tag + i};`;    
        }
        return dot;
    }

    public pushChild(child: Node){
        this.children.push(child);
    }

}