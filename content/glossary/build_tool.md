+++
title = "Build Tool"
toc=true
+++

# Build Tools

A build tool is something which reads one or more input [artifacts](/glossary/artifact) and writes one or more output [artifacts](/glossary/artifact).

```mermaid
flowchart LR 
    input1 --> buildtool[build tool] --> output
    input2 --> buildtool[build tool]
    input3 --> buildtool[build tool]
```


Examples:
* C compiler consumes one .c file and zero or more .h files to prodce a .o file
```mermaid
flowchart LR
    .c --> compiler[[compiler]]
    *.h --> compiler[[compiler]]
    compiler --> .o
```
* C linker consumes one or more .o files to produce an executable file
```mermaid
flowchart LR
    *.o --> linker[[linker]]
    linker --> executable
```
* C linker consumes one or more .o files to produce a shared object
```mermaid
flowchart LR
    *.o --> linker[[linker]]
    linker --> .so
```
* Dynamic linker consumes an executable file and zero or more shared objects to produce a running process
```mermaid
flowchart LR
    executable --> linker[[dynamic linker]]
    *.so --> linker[[dynamic linker]]
    linker --> running[running executable]
```
* Java compiler consumes a .java file to produce a .class files
```mermaid
flowchart LR
    .java --> compiler[[compiler]]
    compiler --> classfile[.class]
```
* Java runtime consumes one or more .class files to produce a running process
```mermaid
flowchart LR
    classfile[*.class] --> runtime[[runtime]]
    runtime --> running[running executable]
```
* Python bytecode compiler consumes a .py file to produce a .pyc file
```mermaid
flowchart LR
    .py --> compiler[[compiler]]
    compiler --> .pyc
```

The totality of ancestors for a given artifact may be represented as an [artifact tree](/glossary/artifact_tree).

## Code Generators

Typically, source code files are hand written by humans, and as such are [leaf artifacts](http://localhost:1313/glossary/artifact/#leaf-artifacts) in the [artifact tree](/glossary/artifact_tree).

Sometimes source code files are themselves **generated** by a code generator from inputs.

```mermaid
flowchart LR
    codegeninput[codegen input] --> codegenerator[[code generator]] --> generatedsrc[generated source code file]
```

A code generator is a [build tool](#build-tools).  The output from a [build tool](#build-tools) is a [derived artifact](http://localhost:1313/glossary/artifact/#derived-artifacts).  Therefore generated soure code is a [derived artifact](http://localhost:1313/glossary/artifact/#derived-artifacts).

