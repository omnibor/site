+++
title = "Artifact"
+++

## Artifact 
An artifact is any software object of interest.

Examples:

- source code file (of any language)
- .o object file
- .so shared object file
- .class java class file
- .jar file
- .pyc compiled python file
- executable file
- container image

{{% notification type="info" %}}
What all artifacts have in common is that they are all arrays of bytes ([]byte).

**Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.**
{{% /notification %}}

## Leaf Artifacts

Some artifacts, usually source code files, are painstakingly constructed by hand by humans.  These are called 'leaf artifacts'.


## Derived Artifacts

Most artifacts are produced by a [build tool](/glossary/build_tool) consuming some set of input artifacts to produce an output artifact.