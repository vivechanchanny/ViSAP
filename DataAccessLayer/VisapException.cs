using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.IO;
using log4net;
using System.Runtime.Serialization;

namespace Excel.Visap.Common.Utilities
{

    /// <summary>
    /// <para>Represents an exception created by a business logic component. <br/> 
    /// This exception should be thrown when a business rule is broken.</para>
    /// </summary>
    [Serializable]
    public class VisapException : Exception
    {
        #region "Constructors"

        /// <summary>
        /// <para>Initializes a new instance of BusinessRule Exception.</para>
        /// </summary>
        public VisapException()
        {
        }

        /// <summary>
        /// <para>Initializes a new instance of the BusinessRuleException class with the specified error message.</para>
        /// </summary>
        /// <param name="message">The exception message</param>
        public VisapException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// <para>Initializes a new instance of the BusinessRuleException class with the specified error
        /// message and specified inner exception.</para>
        /// </summary>
        /// <param name="message">The exception message</param>
        /// <param name="innerException">The inner exception that was detected</param>
        public VisapException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// <para>Initializes a new instance of the BusinessRuleException class with serialized data.</para>
        /// </summary>
        /// <param name="serializationInfo">The serialization information</param>
        /// <param name="context">The serialization context</param>
        public VisapException(SerializationInfo serializationInfo, StreamingContext context)
            : base(serializationInfo, context)
        {
        }

        #endregion
    }
  
}

