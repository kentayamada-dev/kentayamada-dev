import { z } from 'zod';

const ProjectsSchema = z
  .array(
    z.object({
      createdAt: z.iso.datetime(),
      description: z.string(),
      forkCount: z.number(),
      name: z.string(),
      stargazerCount: z.number(),
      updatedAt: z.iso.datetime(),
      url: z.url()
    })
  )
  .nonempty();

const ProjectsInfoSchema = z
  .object({
    data: z.object({
      user: z.object({
        pinnedItems: z.object({
          nodes: ProjectsSchema,
          pageInfo: z.object({
            endCursor: z.string(),
            hasNextPage: z.boolean()
          }),
          totalCount: z.number()
        })
      })
    })
  })
  .transform((res) => {
    return res.data.user.pinnedItems;
  });

const SitemapSchema = z
  .object({
    data: z.object({
      articleCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string(),
              sys: z.object({
                publishedAt: z.iso.datetime()
              })
            })
          )
          .nonempty()
      }),
      utilityCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string(),
              sys: z.object({
                publishedAt: z.iso.datetime()
              })
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return { articleItems: res.data.articleCollection.items, utilityItems: res.data.utilityCollection.items };
  });

const ArticleSlugsSchema = z
  .object({
    data: z.object({
      articleCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string()
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return res.data.articleCollection.items;
  });

const MetadataSchema = z
  .object({
    data: z.object({
      metaDataCollection: z.object({
        items: z.tuple([
          z.object({
            coverImage: z.object({
              title: z.string(),
              url: z.url()
            }),
            description: z.string(),
            sys: z.object({
              firstPublishedAt: z.iso.datetime(),
              publishedAt: z.iso.datetime()
            }),
            title: z.string()
          })
        ])
      })
    })
  })
  .transform((res) => {
    return res.data.metaDataCollection.items[0];
  });

const ArticlesSchema = z
  .object({
    data: z.object({
      articleCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string(),
              subtitle: z.string(),
              sys: z.object({
                firstPublishedAt: z.iso.datetime(),
                publishedAt: z.iso.datetime()
              }),
              title: z.string(),
              topics: z.array(z.string()).nonempty()
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return res.data.articleCollection.items;
  });

const ContactSchema = z
  .object({
    data: z.object({
      contactCollection: z.object({
        items: z.tuple([
          z.object({
            subtitle: z.string(),
            title: z.string()
          })
        ])
      })
    })
  })
  .transform((res) => {
    return res.data.contactCollection.items[0];
  });

const UtilitiesSchema = z
  .object({
    data: z.object({
      utilityCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string(),
              subtitle: z.string(),
              title: z.string()
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return res.data.utilityCollection.items;
  });

const AboutSchema = z
  .object({
    data: z.object({
      aboutCollection: z.object({
        items: z.tuple([
          z.object({
            coverImage: z.object({
              title: z.string(),
              url: z.url()
            }),
            paragraph: z.string(),
            subtitle: z.string(),
            title: z.string()
          })
        ])
      })
    })
  })
  .transform((res) => {
    return res.data.aboutCollection.items[0];
  });

const ArticleSlugSchema = z
  .object({
    data: z.object({
      articleCollection: z.object({
        items: z
          .array(
            z.object({
              content: z.string(),
              subtitle: z.string(),
              sys: z.object({
                firstPublishedAt: z.iso.datetime(),
                publishedAt: z.iso.datetime()
              }),
              title: z.string(),
              topics: z.array(z.string()).nonempty()
            })
          )
          .max(1)
      })
    })
  })
  .transform((res) => {
    return res.data.articleCollection.items[0] ?? null;
  });

const ArticlesTopicSchema = z
  .object({
    data: z.object({
      articleCollection: z.object({
        items: z
          .array(
            z.object({
              slug: z.string(),
              subtitle: z.string(),
              sys: z.object({
                firstPublishedAt: z.iso.datetime(),
                publishedAt: z.iso.datetime()
              }),
              title: z.string(),
              topics: z.array(z.string()).nonempty()
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return res.data.articleCollection.items;
  });

const UtilitySlugSchema = z
  .object({
    data: z.object({
      utilityCollection: z.object({
        items: z.tuple([
          z.object({
            title: z.string()
          })
        ])
      })
    })
  })
  .transform((res) => {
    return res.data.utilityCollection.items[0];
  });

const FaqsSchema = z
  .object({
    data: z.object({
      faqCollection: z.object({
        items: z
          .array(
            z.object({
              answer: z.string(),
              question: z.string()
            })
          )
          .nonempty()
      })
    })
  })
  .transform((res) => {
    return res.data.faqCollection.items;
  });

const TopicSchema = z
  .object({
    fields: z
      .array(
        z.object({
          id: z.string(),
          items: z
            .object({
              validations: z
                .array(
                  z.object({
                    'in': z.array(z.string()).nonempty()
                  })
                )
                .nonempty()
            })
            .optional()
        })
      )
      .nonempty(),
    sys: z.object({
      createdAt: z.iso.datetime(),
      updatedAt: z.iso.datetime()
    })
  })
  .transform((res) => {
    const topic =
      res.fields
        .find((field) => {
          return field.id === 'topics';
        })
        ?.items?.validations[0]?.in.map((topicSlug) => {
          return encodeURIComponent(topicSlug);
        }) ?? [];

    return { createdAt: res.sys.createdAt, topic, updatedAt: res.sys.updatedAt };
  });

export {
  AboutSchema,
  ArticleSlugSchema,
  ArticleSlugsSchema,
  ArticlesSchema,
  ArticlesTopicSchema,
  ContactSchema,
  FaqsSchema,
  MetadataSchema,
  ProjectsInfoSchema,
  ProjectsSchema,
  SitemapSchema,
  TopicSchema,
  UtilitiesSchema,
  UtilitySlugSchema
};
