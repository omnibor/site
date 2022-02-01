+++
title = "Artifact Tree"
toc=true
+++

## Artifact Tree

The artifact tree of an [artifact](/glossary/artifact) is the recursive DAG (Directed Acyclic Graph) of all the `input artifacts` that are transformed by a [build tool](/glossary/build_tool) into
that artifact.  It includes the direct input artifacts, and the recursive set of artifacts to each input artifact, all the way down the tree.

### C Examples
#### Simple C Executable
```mermaid
flowchart BT
    c1[.c] --> o1[.o]
    h1.1[.h] --> o1[.o]
    h1.2[.h] --> o1[.o]
    c2[.c] --> o2[.o]
    h2.1[.h] --> o2[.o]
    h2.2[.h] --> o2[.o]
    o1 --> executable
    o2 --> executable
```

#### Running C Executable with Shared Object
```mermaid
flowchart BT
    c1[.c] --> o1[.o]
    h1.1[.h] --> o1[.o]
    h1.2[.h] --> o1[.o]
    c2[.c] --> o2[.o]
    h2.1[.h] --> o2[.o]
    h2.2[.h] --> o2[.o]
    o1 --> executable
    o2 --> executable
    c3[.c] --> o3[.o]
    h3.1[.h] --> o3[.o]
    h3.2[.h] --> o3[.o]
    c4[.c] --> o4[.o]
    h4.1[.h] --> o4[.o]
    h4.2[.h] --> o4[.o]
    o3 --> .so
    o4 --> .so
    executable --> running[running executable]
    .so --> running[running executable]
```

### Java Example
```mermaid
flowchart BT
    java1[.java] --> cls1[.class]
    java2[.java] --> cls2[.class]
    java3[.java] --> cls3[.class]
    java4[.java] --> cls4[.class]
    java5[.java] --> cls5[.class]
    cls1 --> running[running executable]
    cls2 --> running[running executable]
    cls3 --> running[running executable]
    cls4 --> running[running executable]
    cls5 --> running[running executable]
```

### Go Example
```mermaid
flowchart BT
    go1[.go] --> o1[.o]
    go2[.go] --> o2[.o]
    go3[.go] --> o3[.o]
    go4[.go] --> o4[.o]
    go5[.go] --> o5[.o]
    o1 --> executable
    o2 --> executable
    o3 --> executable
    o4 --> executable
    o5 --> executable
```

### Python Example
```mermaid
flowchart BT
    py1[.py] --> pyc1[.pyc]
    py2[.py] --> pyc2[.pyc]
    py3[.py] --> pyc3[.pyc]
    py4[.py] --> pyc4[.pyc]
    py5[.py] --> pyc5[.pyc]
    pyc1 --> running[running exectuable]
    pyc2 --> running[running exectuable]
    pyc3 --> running[running exectuable]
    pyc4 --> running[running exectuable]
    pyc5 --> running[running exectuable]
```

## Representation

The artifact tree can be represented as a tree with the nodes identified by an [artifact id](/glossary/artifact#artifact-identifiers).

```mermaid
flowchart BT
    Artifact-2[Artifact-2 ID] --> Artifact-1[Artifact-1 ID]
    Artifact-3[Artifact-3 ID] --> Artifact-1[Artifact-1 ID]
    Artifact-4[Artifact-4 ID] --> Artifact-2[Artifact-2 ID]
    Artifact-5[Artifact-5 ID] --> Artifact-2[Artifact-2 ID]
    Artifact-6[Artifact-6 ID] --> Artifact-3[Artifact-3 ID]
    Artifact-7[Artifact-7 ID] --> Artifact-3[Artifact-3 ID]
```

GitBOM advocates for using the [Git Ref](/glossary/git/#git-ref) of an artifact as its [artifact id](/glossary/artifact#artifact-identifiers):

```mermaid
flowchart BT
    Artifact-2[Artifact-2 Git Ref] --> Artifact-1[Artifact-1 Git Ref]
    Artifact-3[Artifact-3 Git Ref] --> Artifact-1[Artifact-1 Git Ref]
    Artifact-4[Artifact-4 Git Ref] --> Artifact-2[Artifact-2 Git Ref]
    Artifact-5[Artifact-5 Git Ref] --> Artifact-2[Artifact-2 Git Ref]
    Artifact-6[Artifact-6 Git Ref] --> Artifact-3[Artifact-3 Git Ref]
    Artifact-7[Artifact-7 Git Ref] --> Artifact-3[Artifact-3 Git Ref]
```

### GitBOM Document
The parent-child relationship is captured by a set of GitBOM Documents.

Each artifact has a GitBOM document that describes its immediate children consiting of a set of new line delimited records, one for each child, in lexical order.

A child artifact which is itself a [leaf artifacts](/glossary/artifact/#leaf-artifacts) would be represented by

```
blob⎵${git ref of child}\n
```

A child artifact which is itself a [derived artifact](/glossary/artifact/#derived-artifacts) would be represented by
```
blob⎵${git ref of child}⎵bom⎵${gitref of child's GitBOM document}\n
```

Example:

```mermaid
flowchart BT
    Artifact-2[Artifact-2 Git Ref] --> Artifact-1[Artifact-1 Git Ref]
    Artifact-3[Artifact-3 Git Ref] --> Artifact-1[Artifact-1 Git Ref]
    Artifact-4[Artifact-4 Git Ref] --> Artifact-2[Artifact-2 Git Ref]
    Artifact-5[Artifact-5 Git Ref] --> Artifact-2[Artifact-2 Git Ref]
    Artifact-6[Artifact-6 Git Ref] --> Artifact-3[Artifact-3 Git Ref]
    Artifact-7[Artifact-7 Git Ref] --> Artifact-3[Artifact-3 Git Ref]
```

Artifact-2's GitBOM:

```
blob⎵${git ref of Artifact-4}\n
blob⎵${git ref of Artifact-5}\n
```

Artifact-3's GitBOM:
```
blob⎵${git ref of Artifact-6}\n
blob⎵${git ref of Artifact-7}\n
```

Artifact-1's GitBOM:
```
blob⎵${git ref of Artifact-2}⎵bom⎵${git ref of Artifact-2's GitBOM}\n
blob⎵${git ref of Artifact-3}⎵bom⎵${git ref of Artifact-2's GitBOM}\n
```

## Recommended Additional Reading
- Find out how [GitBOM](/glossary/gitbom) represents artifact trees.