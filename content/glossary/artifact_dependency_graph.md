+++
title = "Artifact Dependency Graph"
toc=true
aliases = [ "artifact_tree" ]
+++

## Artifact Dependency Graph

The Artifact Dependency Graph (ADG) of an [artifact](/glossary/artifact) is the recursive DAG (Directed Acyclic Graph) of all the `input artifacts` that are transformed by a [build tool](/glossary/build_tool) into
that artifact.  It includes the direct input artifacts, and the recursive set of artifacts to each input artifact, all the way down to source code.

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
    pyc1 --> running[running executable]
    pyc2 --> running[running executable]
    pyc3 --> running[running executable]
    pyc4 --> running[running executable]
    pyc5 --> running[running executable]
```

## Artifact Dependency Graph singularity

An artifact should have precisely one Artifact Dependency Graph. All [equivalent artifacts](/glossary/artifact/#artifact-equivalency) should have the same Artifact Dependency Graph.

## Recommended Additional Reading

- Find out how [OmniBOR](/glossary/omnibor) represents Artifact Dependency.
