---
title: Binary Compatibility
slug: binary-compatibility
date: 2025-08-13T09:48:02-07:00
author: Greg Marsden
---

[Recently, the OpenELA project announced the ELValidated project](https://urldefense.com/v3/__https:/openela.org/blog/elvalidated-compatibility-toolset/__;!!ACWV5N9M2RV99hQ!Jbrk5w-c4h4QRuY7OwsJ5l6Q_vtB3pPh9kLm_mUQ_vMVBhL2Zs1l70KdDVwVHfSo18EdzaWUElPrwcrjyjM$), which introduces a cross-vendor compatibility test suite for Enterprise Linux operating systems. Oracle is proud to participate in that project. In this post, we'll discuss why binary compatibility is important, how we are using ELValidated in our build infrastructure, and what this means for our customers.

## Why is Binary Compatibility important?

Binary compatibility refers to the ability for an executable to load and run in a particular operating environment. To a developer, this means that the system calls, library calls, and data structures are interoperable; to the user, this means that their programs will "just work". No need for porting, recompilation or relinking.

Since we launched more than 15 years ago, binary compatibility has been a cornerstone of the Oracle Linux promise: ["100% application binary compatible with Red Hat Enterprise Linux (RHEL)."](https://www.oracle.com/a/ocom/docs/linux/oracle-linux-ds.pdf), and we've had a great track record of maintaining that compatibility. Binary compatibility has been a key to our competitiveness and success over the years, because it makes it easy for customers to try out our products and support.

## Does Binary Compatibility extend to the kernel?

Perhaps counter-intuitively, the kernel is the easiest place to maintain binary compatibility. The Linux kernel has long held an iron-clad stance on the separation between kernel and userspace, [\[we blogged about that here\]](https://blogs.oracle.com/linux/post/userspace-vs-kernelspace-understanding-the-divide) and the kernel is basically guaranteed to work with userspace.

The way the kernel enforces binary compatibility for userspace comes down to the kernel-headers package. The kernel-headers package includes the header files that userspace programs link against at compile time, and provides the minimum kernel version that the userspace program is guaranteed to work with. This may be different from the running kernel, and also may be different from the kernel that was used on the build system\! As an example, a program could be compiled on a system running the 6.4 kernel, with kernel headers from 5.15, and running on a system with kernel 6.10, and it'll all work just fine. Because the running version (6.10) is greater than the kernel-headers (5.15), the kernel-userspace binary interface is guaranteed.

This is also how we can provide a modern enterprise kernel (UEK) with Oracle Linux with full confidence that user applications will work as designed, without modification, since the kernel-headers are preserved from the base EL versions.

## How does Binary Compatibility work for userspace libraries?

Like the kernel, userspace uses headers to enforce the interface between libraries and binaries. Each library sets its own rules about versioning and compatibility, which can be different for every library on the system. That's where ELValidated comes in \-- using the ABI compatibility tools that are part of libabigail, ELValidated checks the ABI signatures of the packages on an Enterprise Linux distribution and verifies that they match the compatibility standard released by OpenELA. This ensures that applications will "see" the expected interfaces and will work correctly. This is explained in greater detail on the ELValidated page.

## How does Oracle use ELValidated?

Oracle has integrated libabigail and the ELValidated suite into our build and release processes. Even as we were developing the tool, we could see the benefit of extracting and archiving the ABI signature of libraries and executables, and we've enabled the ELValidated tools in our build and release pipeline, so in addition to traditional validation checks we're also extracting the XML describing that program's interfaces, and comparing them with the OpenELA standards.

## What does ELValidated mean for users and customers? What next?

Oracle Linux is 100% application binary compatible with the ELValidated ecosystem. Use Oracle Linux or an OS from the other OpenELA members and rest assured that your applications will interoperate across the OS vendor platforms.

Though the [test suite](https://urldefense.com/v3/__https:/github.com/openela/ELValidated-abi__;!!ACWV5N9M2RV99hQ!Jbrk5w-c4h4QRuY7OwsJ5l6Q_vtB3pPh9kLm_mUQ_vMVBhL2Zs1l70KdDVwVHfSo18EdzaWUElPri5JH1Bk$) and [compatibility APIs](https://urldefense.com/v3/__https:/github.com/openela/Compatibility__;!!ACWV5N9M2RV99hQ!Jbrk5w-c4h4QRuY7OwsJ5l6Q_vtB3pPh9kLm_mUQ_vMVBhL2Zs1l70KdDVwVHfSo18EdzaWUElPrN0nLXNU$) are open source and available for your inspection, it's your OS vendor who is responsible for testing, validating and advertising that their offering is [ELValidated](https://urldefense.com/v3/__https:/openela.org/blog/elvalidated-compatibility-toolset/__;!!ACWV5N9M2RV99hQ!Jbrk5w-c4h4QRuY7OwsJ5l6Q_vtB3pPh9kLm_mUQ_vMVBhL2Zs1l70KdDVwVHfSo18EdzaWUElPrwcrjyjM$).

ELValidated provides benefits to end users, and software and hardware vendors in the Enterprise Linux market. Customers who select an ELValidated OS can confidently run software designed for the Enterprise Linux ecosystem, while application vendors can trust that software tested on one ELValidated platform will function seamlessly on another.
