+++
title = "Artifact"
toc=true
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

What all artifacts have in common is that they are all arrays of bytes ([]byte).

## Artifact Equivalency

Two artifacts are equivalent if and only if `[]byte(artifact1) == []byte(artifact2)`

## Derived Artifacts

Most artifacts are produced by a [build tool](/glossary/build_tool) consuming some set of input artifacts to produce an artifact as an output.
Such artifacts are said to be 'derived artifacts'.


## Leaf Artifacts

Artifacts which are not 'derived artifacts' are said to be 'leaf artifacts'.
Leaf artifacts are usually source code files constructed by hand by humans.


Examples:

- "foo.o is derived from foo.c and bar.h using gcc"
- "fooexecutable is derived from foo.o and baz.o using ld"
- "foo.class is derived from foo.java using javac"

## Artifact Identifiers

It should be possible to identify each artifact with an artifact id.

Artifact IDs should have the following characteristics:

{{% notification type="info" %}}
**Canonical**
: *Independent parties, presented with equivalent artifacts, derive the same artifact identity.*

**Unique**
: *Non-equivalent artifacts have distinct identities.*

**Immutable**
: *An identified artifact can not be modified without also changing its identity.*
{{% /notification %}}

OmniBOR advocates for using the [gitoid](/glossary/git/#git-object-id-gitoid) of an artifact as its artifact ID.

Source code [leaf artifacts](#leaf-artifacts) are typically already being stored in [git](/glossary/git) where they are identified via their [gitoid](/glossary/git/#git-object-id-gitoid).

## Recommended Additional Reading
- Learn more about how each artifact has an [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph)