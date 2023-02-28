// A Javascript program to find articulation points in an undirected graph
         
        // This class represents an undirected graph using adjacency list
        // representation
let ArticulationPoints=[]
        class Graph
        {
            // Constructor
            constructor(v)
            {
                this.V = v;
                this.adj = new Array(v);
                this.NIL = -1;
                this.time = 0;
                for (let i=0; i<v; ++i)
                    this.adj[i] = [];
            }
             
            //Function to add an edge into the graph
            addEdge(v, w)
            {
                this.adj[v].push(w);  // Add w to v's list.
                this.adj[w].push(v);    //Add v to w's list
            }
             
            // A recursive function that find articulation points using DFS
            // u --> The vertex to be visited next
            // visited[] --> keeps track of visited vertices
            // disc[] --> Stores discovery times of visited vertices
            // parent[] --> Stores parent vertices in DFS tree
            // ap[] --> Store articulation points
            APUtil(u, visited, disc, low, parent, ap)
            {
                // Count of children in DFS Tree
                let children = 0;
          
                // Mark the current node as visited
                visited[u] = true;
          
                // Initialize discovery time and low value
                disc[u] = low[u] = ++this.time;
          
                // Go through all vertices adjacent to this
                 
                for(let i of this.adj[u])
                {
                    let v = i;  // v is current adjacent of u
          
                    // If v is not visited yet, then make it a child of u
                    // in DFS tree and recur for it
                    if (!visited[v])
                    {
                        children++;
                        parent[v] = u;
                        this.APUtil(v, visited, disc, low, parent, ap);
          
                        // Check if the subtree rooted with v has a connection to
                        // one of the ancestors of u
                        low[u]  = Math.min(low[u], low[v]);
          
                        // u is an articulation point in following cases
          
                        // (1) u is root of DFS tree and has two or more children.
                        if (parent[u] == this.NIL && children > 1)
                            ap[u] = true;
          
                        // (2) If u is not root and low value of one of its child
                        // is more than discovery value of u.
                        if (parent[u] != this.NIL && low[v] >= disc[u])
                            ap[u] = true;
                    }
          
                    // Update low value of u for parent function calls.
                    else if (v != parent[u])
                        low[u]  = Math.min(low[u], disc[v]);
                }
            }
             
            // The function to do DFS traversal. It uses recursive function APUtil()
            AP()
            {
                // Mark all the vertices as not visited
                let visited = new Array(this.V);
                let disc = new Array(this.V);
                let low = new Array(this.V);
                let parent = new Array(this.V);
                let ap = new Array(this.V); // To store articulation points
          
                // Initialize parent and visited, and ap(articulation point)
                // arrays
                for (let i = 0; i < this.V; i++)
                {
                    parent[i] = this.NIL;
                    visited[i] = false;
                    ap[i] = false;
                }
          
                // Call the recursive helper function to find articulation
                // points in DFS tree rooted with vertex 'i'
                for (let i = 0; i < this.V; i++)
                    if (visited[i] == false)
                        this.APUtil(i, visited, disc, low, parent, ap);
          
                // Now ap[] contains articulation points, print them
                for (let i = 0; i < this.V; i++)
                    if (ap[i] == true)
                        ArticulationPoints.push(i)
            }
        }
        let mydataset={
            nodes :[],
            edges : []
        }
        let noeuds=[]
        let nbrNoeuds=0
document.getElementById('creatGraph').addEventListener('click',()=>{
    let Noeuds = document.getElementById('noeuds')
    Noeuds.innerHTML=""
     nbrNoeuds = document.getElementById('nbrNoeuds').value

    for(let i=0 ; i< nbrNoeuds;i++){
        let noeudsHTML=""
        noeuds[i]=[]
        mydataset.nodes.push(
            {name:i.toString()}
        )
        noeudsHTML+=`
        <div class="oneNoeud">
        <h3 > Noeud ${i}</h3>
        <br>
        <div id="adjs${i}"></div>
        <div class="inputs">
        `
        let k=0
        for(let j=0;j<nbrNoeuds;j++){
            k++
            noeudsHTML+=`    
              
            <label for="in-${j}">${j}</label>
            <input type="checkbox" name="in-${j}" onclick="AddAdj(${i},${j})">
            `
        }
        if(k==nbrNoeuds){
            noeudsHTML+=`</div>
        </div> `}
        Noeuds.innerHTML+=noeudsHTML
    }
    console.log(noeuds)
})
let nbrArrets=0
function AddAdj(i,j){
    noeuds[i].push(j)
    // noeuds[j].push(i)
    mydataset.edges.push(
        {
            source : i , target : j
        }
    )
    console.log(noeuds)
}

// document.write("Articulation points in first graph  <br>");


// g1.addEdge(1, 0);
// g1.addEdge(0, 2);
// g1.addEdge(2, 1);
// g1.addEdge(0, 3);
// g1.addEdge(3, 4);


document.getElementById('calcArtc').addEventListener('click',()=>{
    let g1 = new Graph(nbrNoeuds);

    for(let i=0;i<nbrNoeuds;i++){
        for(let j=0;j<noeuds[i].length;j++){
            // console.log(noeuds[i][j])
            g1.addEdge(i,noeuds[i][j])
        }
        
    }
    startSimulation(mydataset)
    g1.AP();
    let results = "Articulation points are : "
    if (ArticulationPoints.length==0) results += "none"
    else{
    for(let i=0 ; i< ArticulationPoints.length;i++){
        results += ArticulationPoints[i] + " "
    }
}
    document.getElementById("p").innerHTML=results
})

document.write("<br>");