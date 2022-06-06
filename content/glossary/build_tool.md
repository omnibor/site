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
* C compiler consumes one .c file and zero or more .h files to produce a .o file
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

The totality of ancestors for a given artifact may be represented as an [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph).

## Code Generators

Typically, source code files are hand written by humans, and as such are [leaf artifacts](/glossary/artifact/#leaf-artifacts) in the [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph).

Source code files can also be **generated** from other inputs by a code generator.

```mermaid
flowchart LR
    input[input] --> codegenerator[[code generator]] --> generatedsrc[generated source code file]
```

In this scenario, the generated source code file is a [derived artifact](/glossary/artifact/#derived-artifacts). This is because the [code generator](build_tool/#code-generators) is a [build tool](#build-tools) and, by definition, the output from the [build tool](#build-tools) is a [derived artifact](/glossary/artifact/#derived-artifacts).

Code generation is very common in many languages.  See [go generate](https://eli.thegreenplace.net/2021/a-comprehensive-guide-to-go-generate/), [Java Xtend](https://www.eclipse.org/xtend/), and [qtcpp](https://qface.readthedocs.io/en/latest/qtcpp.html).



