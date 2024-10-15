---
title: Third-Party Integrations
---

One of the goals of the OmniBOR project is to integrate the generation of
[Input Manifests][input-manifests] into compilers, linkers, archivers,
bundlers, and containerization tools people already use today. Ideally, we can
achieve a future where Input Manifests are built automatically, and where
anyone distributing software distributes the Input Manifests alongside it. This
is how we can collectively achieve a future of universal transparency through
Artifact Dependency Graphs.

## Build Tool Patches

This goal involves working with a large number of open source projects and
communities. In the spirit of open source, collaboration, and putting in the
work, the OmniBOR Project maintains patches for some existing build tools.
Long-term, our plan is to work with these projects to get OmniBOR generation
integrated upstream.

Today, we maintain patches for the following tools:

| Name      | Patch            |
|:----------|:-----------------|
| GCC       | [Link][gcc]      |
| LLVM      | [Link][llvm]     |
| Binutils  | [Link][binutils] |
| GNU Patch | [Link][patch]    |

If you're interested in contributing to these patches, helping maintain them,
or getting this work upstreamed into their respective projects, we'd love for
you to [get involved][contribute]!

[input-manifests]: @/docs/input-manifests.md
[gcc]: https://github.com/omnibor/gcc-omnibor
[llvm]: https://github.com/omnibor/llvm-omnibor
[binutils]: https://github.com/omnibor/binutils-omnibor
[patch]: https://github.com/omnibor/patch-omnibor
[contribute]: @/contribute.md
